import { useEffect, useState } from 'react';

/**
 * Custom React hook untuk melakukan debounce pada sebuah nilai.
 * @template T - Tipe dari nilai yang akan didebounce
 * @param value - Nilai yang ingin didebounce
 * @param delay - Delay dalam milidetik (default: 500ms)
 * @returns Nilai yang sudah didebounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup jika value atau delay berubah
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
