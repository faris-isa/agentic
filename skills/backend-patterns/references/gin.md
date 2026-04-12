---
name: gin-patterns
description: Reference for Gin (Go) backend patterns - API design, middleware, authentication, Swagger.
---

# Gin Patterns (Go)

## Quick Start

```go
package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.String(200, "Hello Gin!")
    })
    r.Run()
}
```

## Basic Routes

```go
// GET
r.GET("/users", GetUsers)

// GET with params
r.GET("/users/:id", GetUserByID)

// POST
r.POST("/users", CreateUser)

// PATCH
r.PATCH("/users/:id", UpdateUser)

// DELETE
r.DELETE("/users/:id", DeleteUser)
```

## Handlers

```go
func GetUsers(c *gin.Context) {
    var users []User
    db.Find(&users)
    c.JSON(200, users)
}

func GetUserByID(c *gin.Context) {
    id := c.Param("id")
    var user User
    if err := db.First(&user, id).Error; err != nil {
        c.JSON(404, gin.H{"error": "Not found"})
        return
    }
    c.JSON(200, user)
}

func CreateUser(c *gin.Context) {
    var input User
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    db.Create(&input)
    c.JSON(201, input)
}

func UpdateUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    if err := db.First(&user, id).Error; err != nil {
        c.JSON(404, gin.H{"error": "Not found"})
        return
    }
    
    var input User
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    
    db.Model(&user).Updates(input)
    c.JSON(200, user)
}

func DeleteUser(c *gin.Context) {
    id := c.Param("id")
    db.Delete(&User{}, id)
    c.JSON(200, gin.H{"success": true})
}
```

## Validation (Gin Binding)

```go
type CreateUserRequest struct {
    Email string `json:"email" binding:"required,email"`
    Name  string `json:"name" binding:"required,min=1,max=100"`
    Age   int    `json:"age" binding:"gte=0,lte=150"`
}

func CreateUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // process...
}
```

## Swagger Docs

```go
// Install swag
// go get -u github.com/swaggo/swag
// go get -u github.com/swaggo/gin-swagger
// swag init -g main.go

package main

import (
    docs "myproject/docs"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
    r := gin.Default()
    
    docs.SwaggerInfo.Title = "My API"
    docs.SwaggerInfo.Version = "1.0"
    
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
    
    r.Run()
}
```

Add comments to handlers:

```go
// @Summary Get users
// @Description Get all users
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {array} User
// @Router /users [get]
func GetUsers(c *gin.Context) {
    // ...
}
```

Access: `http://localhost:8080/swagger/index.html`

## JWT Auth

```go
import (
    "github.com/golang-jwt/jwt/v5"
    "github.com/gin-gonic/gin"
)

var JWT_SECRET = []byte(os.Getenv("JWT_SECRET"))

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(401, gin.H{"error": "No token provided"})
            c.Abort()
            return
        }
        
        claims := &Claims{}
        _, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
            return JWT_SECRET, nil
        })
        
        if err != nil {
            c.JSON(401, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }
        
        c.Set("user", claims)
        c.Next()
    }
}

// Protected route
r.GET("/profile", AuthMiddleware(), GetProfile)

func GetProfile(c *gin.Context) {
    claims := c.MustGet("user").(*Claims)
    c.JSON(200, claims)
}

type Claims struct {
    ID    int    `json:"id"`
    Email string `json:"email"`
    jwt.RegisteredClaims
}
```

## Error Handling

```go
func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        if len(c.Errors) > 0 {
            for _, e := range c.Errors {
                log.Error(e.Err)
            }
            c.JSON(500, gin.H{"error": "Internal server error"})
        }
    }
}

r.Use(ErrorHandler())
```

## Middleware

```go
// Global
r.Use(gin.Logger())

// Custom
func Logger() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        path := c.Request.URL.Path
        
        c.Next()
        
        latency := time.Since(start)
        status := c.Writer.Status()
        log.Printf("%s %s %d", path, latency, status)
    }
}

// Grouped
api := r.Group("/api")
api.Use(AuthMiddleware())
{
    api.GET("/users", GetUsers)
    api.POST("/users", CreateUser)
}
```

## Best Practices

- Use struct tags for validation
- Use `ShouldBindJSON` for validation errors
- Add Swagger comments for docs
- Return consistent JSON format

## Resources

- [Gin Docs](https://gin-gonic.com/)
- [Swaggo](https://github.com/swaggo/swag)