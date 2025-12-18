import org.w3c.dom.ls.LSOutput;

import java.util.Locale;
import java.util.Scanner;

public class Calculator {

    // Method to add two numbers
    public double add(double a, double b) {
        return a + b;
    }

    // Method to subtract two numbers
    public double subtract(double a, double b) {
        return a - b;
    }

    // Method to multiply two numbers
    public double multiply(double a, double b) {
        return a * b;
    }

    // Method to divide two numbers
    public double divide(double a, double b) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero is not allowed.");
        }
        return a / b;
    }

    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Choose method of Calculation: addition, subtraction, multiplication, division or 'q' to exit.");
            String choice = scanner.nextLine().toLowerCase(Locale.ROOT);

            if (choice.equals("addition")) {
                System.out.println("Enter 1st number: ");
                int a = scanner.nextInt();
                System.out.println("Enter 2nd number: ");
                int b = scanner.nextInt();
                System.out.println("The Sum is: " + calculator.add(a, b) + "\n");
            }
            if (choice.equals("subtraction")) {
                System.out.println("Enter 1st number: ");
                int a = scanner.nextInt();
                System.out.println("Enter 2nd number: ");
                int b = scanner.nextInt();
                System.out.println("The Difference is: " + calculator.subtract(a, b) + "\n");
            }
            if (choice.equals("multiplication")) {
                System.out.println("Enter 1st number: ");
                int a = scanner.nextInt();
                System.out.println("Enter 2nd number: ");
                int b = scanner.nextInt();
                System.out.println("The Product is: " + calculator.multiply(a, b) + "\n");
            }
            if (choice.equals("division")) {
                System.out.println("Enter 1st number: ");
                int a = scanner.nextInt();
                System.out.println("Enter 2nd number: ");
                int b = scanner.nextInt();
                if (b != 0) {
                    System.out.println("The Division is: " + calculator.multiply(a, b) + "\n");
                } else System.out.println("Cannot divide by zero...");
            }
            if (choice.equals("q")) {
                break;
            }
            scanner.nextLine();

        }
        scanner.close();
    }

}