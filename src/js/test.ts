class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hell, ' + this.greeting;
  }
}

let greeter = new Greeter('Word');

console.log(greeter);
