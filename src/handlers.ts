import { type Alpha, type Shade, type RadixHue } from './types';
import * as colorsInUseHelpers from './colorsInUseHelpers';

export function handleColorUsage({
  hue,
  shade,
  alpha = '',
}: {
  hue: RadixHue | 'white' | 'black';
  shade: Shade;
  alpha?: Alpha;
}) {
  colorsInUseHelpers.addColor({
    hue,
    shade,
    alpha,
  });
}

export function handleAliasUsage({ alias, shade, alpha = '' }: { alias: string; shade: Shade; alpha?: Alpha }) {
  colorsInUseHelpers.addShadeToAnAlias({ alias, shade, alpha });
  colorsInUseHelpers.addAllPossibleColorsOfAnAlias({ alias });
}

export function handleDynamicAliasingUsage({ alias, hue }: { alias: string; hue: RadixHue }) {
  colorsInUseHelpers.addPossibleHueToAnAlias({ alias, possibleHue: hue });
  colorsInUseHelpers.addAllPossibleColorsOfAnAlias({ alias });
}
