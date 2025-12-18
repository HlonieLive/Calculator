# OmniCalc - The Ultimate Calculator

**OmniCalc** is a next-generation web application designed to redefine how users interact with numbers. It serves as a centralized hub for a wide spectrum of calculations, merging powerful mathematical engines with a sleek, modern **Glassmorphism** interface.

From solving complex algebraic equations and proving geometric theorems to visualizing investment growth and calculating physics dynamics, OmniCalc offers precision and style in equal measure. Built on a robust **React + Vite** architecture, it ensures a seamless, responsive, and visually engaging experience for students, professionals, and enthusiasts alike.

## Features

### 🧮 Arithmetic Calculator
- Perform standard arithmetic operations (Addition, Subtraction, Multiplication, Division).
- Supports decimal calculations and percentage operations.
- Clean, grid-based interface.

### 🔄 Unit Converter
- **Length**: Meter, Kilometer, Inch, Foot, Yard, Mile, etc.
- **Mass**: Kilogram, Gram, Pound, Ounce.
- **Temperature**: Celsius, Fahrenheit, Kelvin.
- **Angles**: Degree, Radian, Gradian.
- **Currency**: Real-time conversion for USD, EUR, GBP, JPY, CAD, AUD, ZAR.

### 📐 Mathematics Hub
- **Algebra Solver**: Solves linear/quadratic equations, derivatives (`diff`), and integrals (`integrate`). Powered by `nerdamer`.
- **Function Grapher**: Interactive plotting of mathematical functions.
- **Theorems & Proofs**: A digital library of definitions and step-by-step proofs for Geometry, Algebra, and Calculus (Basic to Expert levels).

### 📈 Finance Hub
- **Investment Growth**: Visualize compound interest with interactive charts.
- **Loan Calculator**: Estimate mortgage payments and amortization.
- **Salary Converter**: Compare hourly, weekly, monthly, and annual income.
- **Currency Selection**: Support for major global currencies.

### ⚖️ BMI Calculator
- Calculate Body Mass Index (BMI) using Height and Weight.
- **Visual Health Bar**: See exactly where you stand on the health spectrum (Underweight, Normal, Overweight, Obese) with a dynamic color-coded indicator.

### ⚛️ Physics Calculator
- Solve complex physics formulas instantly:
    - **Velocity** ($v = d/t$)
    - **Displacement** ($d = v \times t$)
    - **Force** ($F = m \times a$)
    - **Kinetic Energy** ($KE = 0.5 \times m \times v^2$)

---

## � Usage

### Navigation
Upon launching OmniCalc, you are greeted with a centralized **Main Menu**. Simply click on any card (e.g., *Mathematics*, *Finance*, *Converter*) to enter that specific module. Use the **Back Arrow (←)** in the top-left corner of any tool to return to the main menu.

### Using the Math Solver
The Algebra Solver supports natural syntax for complex operations.
*   **Solve Equations**: Type `3x + 5 = 20` and press Enter.
*   **Derivatives**: Type `diff(x^2 + 5x)` to find the derivative.
*   **Integrals**: Type `integrate(sin(x))` to compute the integral.
*   **General Math**: Evaluate expressions like `sqrt(144) + 5^3`.

### Interactive Graphs
*   In the **Finance** and **Mathematics** modules, charts are interactive.
*   Hover over any data point on the line or area charts to see precise values (e.g., *Year 5: $15,400 Total Value*).
*   Adjust input fields (like *Interest Rate* or *Formula Range*) to see the graphs update in real-time.

---

## �🛠️ Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Math Engine**: [Nerdamer](https://nerdamer.com/) & [recharts](https://recharts.org/)
- **Styling**: Vanilla CSS (Variables, Flexbox, Grid, Glassmorphism)
- **Fonts**: [Outfit](https://fonts.google.com/specimen/Outfit) & [Inter](https://fonts.google.com/specimen/Inter)

---

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Locally**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📁 Legacy Code
The original Java implementation of the calculator has been archived in the `legacy_java/` directory.
