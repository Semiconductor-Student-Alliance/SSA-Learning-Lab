// Digital Logic Simulator Classes
class LogicGate {
    constructor(name) {
        this.name = name;
    }
}

class AndGate extends LogicGate {
    constructor() { super("AND"); }
    evaluate(input1, input2) {
        return (input1 === 1 && input2 === 1) ? 1 : 0;
    }
}

class OrGate extends LogicGate {
    constructor() { super("OR"); }
    evaluate(input1, input2) {
        return (input1 === 1 || input2 === 1) ? 1 : 0;
    }
}

class DFlipFlop extends LogicGate {
    constructor() {
        super("D-FF");
        this.state = 0;
    }
    // Triggers on rising clock edge in a real circuit, simulated here via function call
    clockPulse(dInput) {
        this.state = dInput;
        return this.state;
    }
}
