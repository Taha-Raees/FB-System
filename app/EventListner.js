import React, { useEffect } from 'react';
import { listen } from '@tauri-apps/api/event';

const MyComponent = () => {
    useEffect(() => {
        const unlistenSearch = listen('search', event => {
            // Handle search action
            console.log("Search event triggered");
        });

        const unlistenAccount = listen('account', event => {
            // Handle account action
            console.log("Account event triggered");
        });

        return () => {
            unlistenSearch.then(fn => fn());
            unlistenAccount.then(fn => fn());
        };
    }, []);

    // JSX for your component
    return <div>Your Component</div>;
};

export default MyComponent;
