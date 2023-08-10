interface Interface {
  name: string;
  public?: boolean;
  interfaces?: Array<string | Interface>;
  //   attributes?: Array<Attribute>
}
export default ({ name, public: isPublic, interfaces }: Interface) =>
  [
    `interface ${name}${isPublic ? ' public' : ''}.`,
    `interfaces:${interfaces}`,
    'endinterface.',
  ]
    .flat()
    .join('/n');
