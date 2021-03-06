## API Report File for "@fluentui/react-badge"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { ComponentProps } from '@fluentui/react-utilities';
import { ObjectShorthandProps } from '@fluentui/react-utilities';
import * as React from 'react';
import { ShorthandProps } from '@fluentui/react-utilities';

// @public
export const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLElement>>;

// @public (undocumented)
export type BadgeAppearances = 'filled' | 'outline' | 'ghost' | 'tint';

// @public (undocumented)
export interface BadgeProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
    appearance?: BadgeAppearances;
    icon?: ShorthandProps<HTMLElement>;
    iconPosition?: 'before' | 'after';
    shape?: BadgeShape;
    size?: SizeValue;
    status?: BadgeStatus;
}

// @public (undocumented)
export type BadgeShape = 'rounded' | 'square' | 'circular';

// @public
export const badgeShorthandProps: (keyof BadgeProps)[];

// @public (undocumented)
export interface BadgeState extends BadgeProps {
    icon?: ObjectShorthandProps<HTMLSpanElement>;
    ref: React.MutableRefObject<HTMLElement>;
}

// @public (undocumented)
export type BadgeStatus = 'success' | 'warning' | 'severe' | 'accent' | 'danger' | 'important' | 'informative' | 'subtle';

// @public (undocumented)
export const renderBadge: (state: BadgeState) => JSX.Element;

// @public (undocumented)
export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

// @public
export const useBadge: (props: BadgeProps, ref: React.Ref<HTMLElement>, defaultProps?: BadgeProps | undefined) => BadgeState;

// @public
export const useBadgeStyles: (state: BadgeState) => BadgeState;

// @public
export const useIconStyles: (selectors: BadgeState) => string;

// @public
export const useRootStyles: (selectors: BadgeState) => string;


// (No @packageDocumentation comment for this package)

```
