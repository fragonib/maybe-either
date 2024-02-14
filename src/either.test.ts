import { Either, Left, Right } from "./either";
import moment, { Moment } from "moment"; 

describe('Either', () => {

  it('Mapping right', () => {
    expect(
      Right.of('rain')
        .map(str => `b${str}`)
        .toString()
    ).toEqual("Right(brain)");

    expect(
      Right.of({ host: 'localhost', port: 80 })
        .map(prop('host'))
        .toString()
    ).toEqual("Right(localhost)");
  });

  it('Mapping left', () => {
    expect(
      Left.of('rain')
        .map(str => `It's gonna ${str}, better bring your umbrella!`)
        .toString()
    ).toEqual("Left(rain)");

    expect(
      Left.of('rolls eyes...')
        .map(prop('host'))
        .toString()
    ).toEqual("Left(rolls eyes...)");
  });

  it("Error handling", async () => {
    const now = moment();
    const age = getAge(now);
    expect(
      age({ birthDate: '2005-12-12' }).toString()
    ).toEqual("Right(18)");

    expect(
      age({ birthDate: 'July 4, 2001' }).toString()
    ).toEqual("Left(Birth date could not be parsed)");
  });
});

const prop = (name: string) => (obj: any) => obj[name];
const getAge = (now: Moment) => (user: { birthDate: string }): Either<string, number> => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');
  return birthDate.isValid()
    ? Right.of(now.diff(birthDate, 'years'))
    : Left.of('Birth date could not be parsed');
}