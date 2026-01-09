export function translateZodIssue(issue: any): string {
  switch (issue.code) {
    case "invalid_type":
      return "Campo obrigatório ou tipo inválido";

    case "invalid_string":
      if (issue.validation === "email") {
        return "Formato de e-mail inválido";
      }

      if (issue.validation === "uuid") {
        return "UUID inválido";
      }

      return "Texto inválido";

    case "too_small":
      if (issue.type === "string") {
        return `Deve ter no mínimo ${issue.minimum} caracteres`;
      }

      if (issue.type === "number") {
        return `Deve ser no mínimo ${issue.minimum}`;
      }

      return "Valor muito pequeno";

    case "too_big":
      if (issue.type === "string") {
        return `Deve ter no máximo ${issue.maximum} caracteres`;
      }

      if (issue.type === "number") {
        return `Deve ser no máximo ${issue.maximum}`;
      }

      return "Valor muito grande";

    case "invalid_enum_value":
      // ⚠️ issue.options só existe nesse caso
      return `Valor inválido. Opções válidas: ${issue.options?.join(", ")}`;

    case "custom":
      return issue.message ?? "Valor inválido";

    default:
      return "Valor inválido";
  }
}
