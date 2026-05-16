function isBlobError(title: string): boolean {
  return (
    title.includes("Blob not found") ||
    title.includes("Connect error internal") ||
    title.startsWith("[Error:")
  );
}

export default async (input: { client: any }) => {
  const { client } = input;

  return {
    event: async ({
      event,
    }: {
      event: {
        type: string;
        properties?: { info?: { id: string; title: string } };
      };
    }) => {
      if (event.type !== "session.updated") return;
      const session = event.properties?.info;
      if (!session || !isBlobError(session.title)) return;

      await client.session
        .update({ path: { id: session.id }, body: { title: "New Chat" } })
        .catch(() => {});
    },
  };
};
