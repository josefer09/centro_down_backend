// src/domain/dtos/propositoAlcanzado/create.propositoAlcanzado.dto.ts
export class CreatePropositoAlcanzadoDto {
  private constructor(
    public readonly id_proposito: number,
    public readonly avance: number,
    public readonly aprendizajesEsperadosIds: number[]
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreatePropositoAlcanzadoDto?] {
    const { id_proposito, avance, aprendizajesEsperadosIds } = object;

    if (!id_proposito) return ["Missing proposito"];
    if (!avance) return ["Missing avance"];
    if (!aprendizajesEsperadosIds) return ["Missing aprendizajes esperados"];

    return [
      undefined,
      new CreatePropositoAlcanzadoDto(
        id_proposito,
        avance,
        aprendizajesEsperadosIds
      ),
    ];
  }
}
