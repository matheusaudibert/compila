fetch("http://localhost:3000/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    language: "java",
    code: `import java.util.Scanner;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int sum = 0;
        if (sc.hasNextLine()) {
            String[] numbers = sc.nextLine().split(" ");
            for (String numStr : numbers) {
                if (!numStr.isEmpty()) {
                    sum += Integer.parseInt(numStr);
                }
            }
        }
        System.out.println(sum);
        sc.close();
    }
}
`,
    problem: "A",
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
