import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    fluid?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, fluid = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    fluid
                        ? 'w-full px-4 sm:px-6 lg:px-8'
                        : `
                            w-full px-4 sm:px-6 lg:px-8
                            mx-auto
                            max-w-[540px]
                            sm:max-w-[720px]
                            md:max-w-[960px]
                            lg:max-w-[1140px]
                            xl:max-w-[1320px]
            `,
                    className
                )}
                {...props}
            />
        );
    }
);

Container.displayName = 'Container';

export { Container };