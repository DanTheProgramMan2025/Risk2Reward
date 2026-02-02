"use client"

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function useCookie<T>(name: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const currentValue = Cookies.get(name);
        return currentValue ? JSON.parse(currentValue) as T : initialValue as T;
    });

    useEffect(() => {
        if (value === undefined || value === null) {
            Cookies.remove(name);
        } else {
            Cookies.set(name, JSON.stringify(value));
        }
    }, [name, value]);

    return [value, setValue] as const;
};