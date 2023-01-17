import DropKit from 'dropkit.js';
import { JsonRpcProvider } from '@ethersproject/providers';

import React from 'react';
import { useProvider, useSigner } from 'wagmi';

function useDropKit(): DropKit | null {
    const provider = useProvider();
    const { data: signer } = useSigner();
    const [dropKit, setDropKit] = React.useState<DropKit | null>(null);
    const isDev = process.env.NEXT_PUBLIC_IS_DEV === 'true';

    React.useEffect(() => {
        async function bootstrap() {
            setDropKit(
                await DropKit.create(
                    process.env.NEXT_PUBLIC_APP_NIFTYKIT_API_KEY || '',
                    isDev,
                    undefined,
                    (signer ? signer : provider) as JsonRpcProvider,
                )
            );
        }
        bootstrap();
    }, [isDev, provider, signer]);

    return dropKit;
}

export default useDropKit;