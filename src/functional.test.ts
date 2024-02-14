import { compose, map } from "./functional";
import { Maybe } from "./maybe";

describe("Maybe Container", () => {

  it("can be composed", async () => {
    const streetName: (person: Person) => Maybe<Address> = 
      compose(
        // map(prop<Address>('street')),
        prop<Person>('addresses'),
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

const prop = <T>(name: keyof T) => (obj: T): T[keyof T] => obj[name]

// infer the type of a property from a record given the name of the property
type PropType<T, K extends keyof T> = T[K];
const a : PropType<Person, 'addresses'> = [];