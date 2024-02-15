import { compose, map } from "./functional";
import { Maybe } from "./maybe";

describe("Functions", () => {

  it("can be composed", async () => {
    const streetName: (person: Person) => Maybe<string> = 
      compose(
        map(prop<string>('street')),
        prop<Address>('addresses'),
      );
        
    expect(streetName({ 
      name: "Fran",
      addresses: [] 
    }).inspect()).toBe('Nothing');
    
    expect(streetName({ 
      name: "Jose",
      addresses: [
        { street: 'Shady Ln.', number: 4201 }
      ] 
    }).inspect()).toBe('Just(Shady Ln.)');

  });
  
});

type Person = {
  name: string;
  addresses: Address[];
}

type Address = {
  street: string;
  number: number;
}


export type Obj = { [key: string]: any };
export const prop = <T>(name: string) => (obj: Obj): Maybe<T> => obj[name];
const a = prop<string>('street')
const b = prop<Address>('addresses')