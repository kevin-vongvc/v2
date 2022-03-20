import dynamic from 'next/dynamic';
import {
  createCurrentUserHook,
  createPreviewSubscriptionHook,
} from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { PortableTextComponents } from '@portabletext/react';
const AccordionBlock = dynamic(() => import('@blocks/AccordionBlock'));
const BreakBlock = dynamic(() => import('@blocks/BreakBlock'));
const CodeBlock = dynamic(() => import('@blocks/CodeBlock'));
const FigureBlock = dynamic(() => import('@blocks/FigureBlock'));
const GIFBlock = dynamic(() => import('@blocks/GIFBlock'));
const YouTubeBlock = dynamic(() => import('@blocks/YouTubeBlock'));
import { sanityConfig } from './config';

export const ptComponents: PortableTextComponents = {
  types: {
    accordion: AccordionBlock,
    break: BreakBlock,
    code: CodeBlock,
    figure: FigureBlock,
    gif: GIFBlock,
    youtube: YouTubeBlock,
  },
};

export const urlFor = (source) =>
  createImageUrlBuilder(sanityConfig).image(source);

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);

export const useCurrentUser = createCurrentUserHook(sanityConfig);
