export const normalizeBy = <T extends Record<string, any>>(arr: T[], key: keyof T): Record<string, T> =>
  arr.reduce((pv: Record<string, T>, cv: T) => {
    pv[cv[key]] = cv;
    return pv;
  }, {});
