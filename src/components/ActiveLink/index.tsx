import { cloneElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
    children: any;
    classActive: string;
}

export function ActiveLink({children, classActive, ...rest}: ActiveLinkProps) {
    const { asPath } = useRouter();
    const className = asPath == rest.href ? classActive : "";
    return (
        <>
            <Link {...rest}>
                {
                    cloneElement(children, {
                        className,
                    })
                }
            </Link>
        </>
    )
}