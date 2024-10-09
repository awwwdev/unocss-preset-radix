import {
  Alias,
  AliasesInUse,
  Alpha,
  ColorsInUse,
  RadixHue,
  Shade,
  ShadeAlpha,
} from './types';

const colorsInUse = {} as ColorsInUse;
const aliasesInUse = {} as AliasesInUse;

export function getColorsInUse() {
  return colorsInUse as Readonly<ColorsInUse>;
}

export function getAliasesInUse() {
  return aliasesInUse as Readonly<AliasesInUse>;
}



export function addColor({ hue, shade, alpha }: { hue: RadixHue | 'black' | 'white'; shade: Shade; alpha: Alpha }) {
  colorsInUse[hue] = colorsInUse[hue] ?? {};
  colorsInUse[hue].shadesInUse = colorsInUse[hue].shadesInUse ?? {};
  colorsInUse[hue].shadesInUse[`${shade}${alpha}` as ShadeAlpha] = { hue, shade, alpha };
}

export function addShadeToAnAlias({ alias, shade, alpha }: { alias: Alias; shade: Shade; alpha: Alpha }) {
  aliasesInUse[alias] = aliasesInUse[alias] ?? {};
  aliasesInUse[alias].shadesInUse = aliasesInUse[alias].shadesInUse ?? {};
  aliasesInUse[alias].possibleHues = aliasesInUse[alias].possibleHues ?? [];
  
  aliasesInUse[alias].shadesInUse[`${shade}${alpha}` as ShadeAlpha] = {
    shade,
    alpha,
    // we keep possible hues on aliasesInUse[alias].possibleHues, because each alias can be reassigned (through alias-danger-is-orange utility class) to another hue in diffrenet parts of html
  };
  console.log("🚀 ~ aliasesInUse:", aliasesInUse)
}

export function addPossibleHueToAnAlias({ alias, possibleHue }: { alias: Alias; possibleHue?: RadixHue }) {
  aliasesInUse[alias] = aliasesInUse[alias] ?? {};
  aliasesInUse[alias].shadesInUse = aliasesInUse[alias].shadesInUse ?? {};
  aliasesInUse[alias].possibleHues = aliasesInUse[alias].possibleHues ?? [];

  if (!!possibleHue && !aliasesInUse[alias].possibleHues.includes(possibleHue)) {
    aliasesInUse[alias].possibleHues.push(possibleHue);
  }
}

export function addAllPossibleColorsOfAnAlias({ alias }: { alias: string }) {
  const aliasesInUse = getAliasesInUse();

  for (const possibleHue of aliasesInUse[alias].possibleHues) {
    for (const shadeAlpha in aliasesInUse[alias].shadesInUse) {
      const { alpha, shade } = aliasesInUse[alias].shadesInUse[shadeAlpha as ShadeAlpha];
      addColor({ hue: possibleHue, shade, alpha });
    }
  }
}
