import { RemovableRef, StorageSerializers, useStorage, UseStorageOptions } from '@vueuse/core';
import { Nullable } from '@/types/nullable';

export declare type NullableStorageOptions<T> = {
	defaultValue: Nullable<T>;
	storage?: Storage;
	options?: Nullable<StorageOptions<T | any>>;
};
export function useNullableStorage<T>(
	key: string,
	payload: NullableStorageOptions<T> = {
		defaultValue: null,
		storage: localStorage,
		options: null,
	},
): RemovableRef<Nullable<T>> {
	const defaultOptions = { serializer: StorageSerializers.object } as StorageOptions<T | any>;
	const mergedOptions = payload?.options ? { ...defaultOptions, ...payload.options } : defaultOptions;
	return useStorage(key, payload.defaultValue, localStorage, mergedOptions);
}
