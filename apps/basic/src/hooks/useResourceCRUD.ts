import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type MutationLifecycle<TValues> = {
  onMutate?: (values: TValues) => void;
  onSuccess?: (values: TValues) => void;
  onError?: (values: TValues, error: unknown) => void;
};

type UseResourceCRUDOptions<TListData, TCreateValues, TUpdateValues> = {
  queryKey: readonly unknown[];
  invalidateKey: readonly unknown[];
  queryFn: () => Promise<unknown>;
  select: (raw: unknown) => TListData;
  createFn: (values: TCreateValues) => Promise<unknown>;
  updateFn: (values: TUpdateValues) => Promise<unknown>;
  deleteFn: (id: string) => Promise<unknown>;
  createLifecycle?: MutationLifecycle<TCreateValues>;
  updateLifecycle?: MutationLifecycle<TUpdateValues>;
  deleteLifecycle?: MutationLifecycle<string>;
};

export function useResourceCRUD<TListData, TCreateValues, TUpdateValues>(
  options: UseResourceCRUDOptions<TListData, TCreateValues, TUpdateValues>,
) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    select: options.select,
  });

  const createMutation = useMutation({
    mutationFn: options.createFn,
    onMutate: (values) => {
      options.createLifecycle?.onMutate?.(values);
    },
    onSuccess: (_data, values) => {
      void queryClient.invalidateQueries({ queryKey: options.invalidateKey });
      options.createLifecycle?.onSuccess?.(values);
    },
    onError: (error, values) => {
      options.createLifecycle?.onError?.(values, error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: options.updateFn,
    onMutate: (values) => {
      options.updateLifecycle?.onMutate?.(values);
    },
    onSuccess: (_data, values) => {
      void queryClient.invalidateQueries({ queryKey: options.invalidateKey });
      options.updateLifecycle?.onSuccess?.(values);
    },
    onError: (error, values) => {
      options.updateLifecycle?.onError?.(values, error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: options.deleteFn,
    onMutate: (id) => {
      options.deleteLifecycle?.onMutate?.(id);
    },
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: options.invalidateKey });
      options.deleteLifecycle?.onSuccess?.(id);
    },
    onError: (error, id) => {
      options.deleteLifecycle?.onError?.(id, error);
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
