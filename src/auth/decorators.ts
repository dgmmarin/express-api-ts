function first() {
    console.log("first(): factory evaluated");
    return function () {
        console.log("first(): called");
    };
}

export function test() {
    return (
        target: any,
        propertyKey: any,
        descriptor: PropertyDescriptor,
    ):any => {
        descriptor.value = (...args: any[]):any => {
            const value = descriptor.value;
            const out = value.apply(args);
            return out;
        }
    };
}

export const log = (target: any | undefined, propertyKey: string, descriptor: PropertyDescriptor):any => {
    // Capture the functional behavior of the decorated method
    const originalMethod = descriptor.value;
    // Override the decorated method's behavior with new behavior
    descriptor.value = function (...args: any[]) {
        let msg: string;
        // The decorated method's parameters will be passed in as args.
        // We'll assume the decorated method might only have a single parameter,
        // check to see if it's been passed in the method
        if (args[0]) {
            msg = (`${propertyKey}, that has a parameter value: ${args[0]}`)
        }
        else {
            msg = `${propertyKey}`
        }
        // Emit a message to the console
        console.log(`Logger says - calling the method: ${msg}`);
        // Execute the behavior originally programmed in
        // the decorated method
        const result = originalMethod.apply(this, args);
        // if the decorated method returned a value when executed,
        // capture that result
        if (result) {
            msg = `${propertyKey} and returned: ${JSON.stringify(result)}`;
        }
        else {
            msg = `${propertyKey}`;
        }
        // Having executed the decorated method's behavior, emit
        // a message to the console report what happened
        console.log(`Logger says - called the method: ${msg}`);
        return result;
    };
    return descriptor;
};