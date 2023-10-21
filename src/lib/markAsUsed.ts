type I = (...x: unknown[]) => unknown;
const markAsUsed: I = () => undefined;
markAsUsed(markAsUsed);

export default markAsUsed;
