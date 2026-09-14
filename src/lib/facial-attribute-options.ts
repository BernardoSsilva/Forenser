import type { FacialAttributes } from '@/lib/types';

export interface AttributeOption {
  value: string;
  label: string;
}

export const FACIAL_ATTRIBUTE_OPTIONS: Record<string, AttributeOption[]> = {
  sex: [
    { value: 'man', label: 'Homem' },
    { value: 'woman', label: 'Mulher' },
  ],
  ageGroup: [
    { value: 'teen', label: 'Jovem' },
    { value: 'young', label: 'Jovem adulto' },
    { value: 'middle-aged', label: 'Meia idade' },
    { value: 'elderly', label: 'Idoso' },
  ],
  skinColor: [
    { value: 'light', label: 'Branca' },
    { value: 'medium', label: 'Parda' },
    { value: 'olive', label: 'Morena' },
    { value: 'dark', label: 'Escura' },
    { value: 'pale', label: 'Pálida' },
  ],
  bodyType: [
    { value: 'lean', label: 'Magro' },
    { value: 'strong', label: 'Forte' },
    { value: 'fat', label: 'Gordo' },
    { value: 'obese', label: 'Obeso' },
    { value: 'anorexic', label: 'Anoréxico' },
  ],
  faceShape: [
    { value: 'oval', label: 'Oval' },
    { value: 'round', label: 'Redonda' },
    { value: 'square', label: 'Quadrada' },
    { value: 'heart', label: 'Coração' },
    { value: 'diamond', label: 'Diamante' },
  ],
  headShape: [
    { value: 'oval', label: 'Oval' },
    { value: 'round', label: 'Redonda' },
    { value: 'square', label: 'Quadrada' },
    { value: 'heart', label: 'Coração' },
    { value: 'diamond', label: 'Diamante' },
  ],
  hairHeight: [
    { value: 'bald', label: 'Careca' },
    { value: 'shaved', label: 'Raspado' },
    { value: 'short', label: 'Curto' },
    { value: 'medium', label: 'Médio' },
    { value: 'long', label: 'Longo' },
  ],
  hairType: [
    { value: 'straight', label: 'Liso' },
    { value: 'wavy', label: 'Ondulado' },
    { value: 'curly', label: 'Encaracolado' },
    { value: 'coiled', label: 'Cacheado' },
    { value: 'frizzy', label: 'Frisado' },
  ],
  hairColor: [
    { value: 'black', label: 'Preto' },
    { value: 'brown', label: 'Castanho' },
    { value: 'blonde', label: 'Loiro' },
    { value: 'red', label: 'Ruivo' },
    { value: 'gray', label: 'Grisalho' },
  ],
  hairStyle: [
    { value: 'bald', label: 'Careca' },
    { value: 'ponytail', label: 'Rabo de cavalo' },
    { value: 'mullet', label: 'Mullet' },
    { value: 'afro', label: 'Afro' },
    { value: 'spiky', label: 'Bagunçado' },
  ],
  beard: [
    { value: 'none', label: 'Sem barba' },
    { value: 'stubble', label: 'Barba por fazer' },
    { value: 'full', label: 'Fechada' },
    { value: 'goatee', label: 'Cavanhaque' },
    { value: 'moustache', label: 'Bigode' },
  ],
  beardStyle: [
    { value: 'degrade', label: 'Degradê' },
    { value: 'long', label: 'Longa' },
    { value: 'circle', label: 'Circular' },
    { value: 'muttonchops', label: 'Costeletas' },
  ],
  eyeShape: [
    { value: 'round', label: 'Redondo' },
    { value: 'almond', label: 'Alongado' },
    { value: 'hooded', label: 'Fechado' },
    { value: 'upturned', label: 'Elevado' },
    { value: 'downturned', label: 'Caído' },
  ],
  eyeColor: [
    { value: 'brown', label: 'Castanho' },
    { value: 'black', label: 'Preto' },
    { value: 'blue', label: 'Azul' },
    { value: 'green', label: 'Verde' },
    { value: 'gray', label: 'Cinza' },
  ],
  mouthShape: [
    { value: 'small', label: 'Pequena' },
    { value: 'medium', label: 'Média' },
    { value: 'wide', label: 'Grossa' },
    { value: 'thin', label: 'Fina' },
  ],
  noseShape: [
    { value: 'pointed', label: 'Pontudo' },
    { value: 'flat', label: 'Chato' },
    { value: 'wide', label: 'Largo' },
    { value: 'snub', label: 'Empinado' },
    { value: 'hawk', label: 'Aquilino (curvo)' },
  ],
  chinShape: [
    { value: 'pointed', label: 'Pontudo' },
    { value: 'square', label: 'Quadrado' },
    { value: 'rounded', label: 'Arredondado' },
    { value: 'cleft', label: 'Fendido' },
    { value: 'strong', label: 'Definido' },
  ],
  earShape: [
    { value: 'small', label: 'Pequenas' },
    { value: 'large', label: 'Grandes' },
    { value: 'pointy', label: 'Pontudas' },
  ],
  ethnicity: [
    { value: 'caucasian', label: 'Caucasiana' },
    { value: 'african', label: 'Africana' },
    { value: 'asian', label: 'Asiática' },
    { value: 'hispanic', label: 'Hispânica' },
    { value: 'middle-eastern', label: 'Oriente Médio' },
  ],
  accessories: [
    { value: 'none', label: 'Nenhum' },
    { value: 'glasses', label: 'Óculos' },
    { value: 'earring', label: 'Brinco' },
  ],
  facialMarks: [
    { value: 'none', label: 'Nenhuma' },
    { value: 'scars', label: 'Cicatrizes' },
    { value: 'wrinkles', label: 'Rugas' },
  ],
};

export const FACIAL_ATTRIBUTE_LABELS: Record<string, string> = {
  sex: 'Sexo',
  ageGroup: 'Grupo de idade',
  skinColor: 'Cor da pele',
  bodyType: 'Aspecto físico',
  faceShape: 'Formato do rosto',
  headShape: 'Formato da cabeça',
  hairHeight: 'Comprimento do cabelo',
  hairType: 'Tipo de cabelo',
  hairColor: 'Cor do cabelo',
  hairStyle: 'Estilo de cabelo',
  beard: 'Barba',
  beardStyle: 'Estilo da barba',
  eyeShape: 'Formato dos olhos',
  eyeColor: 'Cor dos olhos',
  mouthShape: 'Formato da boca',
  noseShape: 'Formato do nariz',
  chinShape: 'Formato do queixo',
  earShape: 'Formato das orelhas',
  ethnicity: 'Etnia',
  accessories: 'Acessórios',
  facialMarks: 'Marcas faciais',
};

export const DEFAULT_FACIAL_ATTRIBUTES: FacialAttributes = Object.fromEntries(
  Object.entries(FACIAL_ATTRIBUTE_OPTIONS).map(([key, options]) => [key, options[0].value]),
) as unknown as FacialAttributes;
