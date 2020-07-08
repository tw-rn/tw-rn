/**
 * Parses the box-shadow value to a transformable value
 * @param value box-shadow value
 */
export const boxShadow = (value: string): { parsed: string; meta: any } => {
  const [shadow] = value.split(/,(?![^\(]*\))/);

  const splitted = shadow.split(/\s(?![^\(]*\))/);

  let offsetX = "";
  let offsetY = "";
  let blurRadius = "";
  let spreadRadius = "";
  let color = "";

  switch (splitted.length) {
    case 5: {
      [offsetX, offsetY, blurRadius, spreadRadius, color] = splitted;
      const meta = { offsetX, offsetY, blurRadius, spreadRadius, color };
      const parsed = [offsetX, offsetY, blurRadius, color].join(" ");
      return { parsed, meta };
    }

    case 4: {
      [offsetX, offsetY, blurRadius, color] = splitted;
      const meta = { offsetX, offsetY, blurRadius, spreadRadius, color };
      const parsed = [offsetX, offsetY, blurRadius, color].join(" ");
      return { parsed, meta };
    }

    case 3: {
      [offsetX, offsetY, color] = splitted;
      const meta = { offsetX, offsetY, blurRadius, spreadRadius, color };
      const parsed = [offsetX, offsetY, color].join(" ");
      return { parsed, meta };
    }

    default: {
      [offsetX] = splitted;
      const meta = { offsetX, offsetY, blurRadius, spreadRadius, color };
      const parsed = offsetX;
      return { parsed, meta };
    }
  }
};

const parsersMap = {
  "box-shadow": boxShadow,
};

export const parse = (
  prop: string,
  value: string
): { parsed: string; meta: any } => {
  if ((parsersMap as any)[prop] !== undefined) {
    return (parsersMap as any)[prop](value);
  }

  return { parsed: value, meta: {} };
};
