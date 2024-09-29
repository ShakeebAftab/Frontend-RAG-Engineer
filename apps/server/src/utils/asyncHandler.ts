type HandleAsyncType<T> = [T, any];

export const handleAsync = async <T>(
  promise: Promise<T>
): Promise<HandleAsyncType<T>> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [undefined as T, error];
  }
};
