import { useEffect } from 'react';

const network = import.meta.env.VITE_APP_NETWORK ?? "";

const defaultTitle = `A.O ${network}`;
const defaultPrefix = `A.O ${network}: `;

export default function useTitle(title: string, noPrefix?: true) {
    useEffect(() => {
        const prefix = noPrefix ? "" : defaultPrefix;
        document.title = prefix + title;
        return () => { document.title = defaultTitle; }
    }, [title]);
}
