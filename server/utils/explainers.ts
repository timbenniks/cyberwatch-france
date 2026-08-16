import type { Explainer, ExplainerFile } from '~~/app/types/cyberwatch'
import raw from '~~/data/explainers.json'

export const explainerFile = raw as unknown as ExplainerFile
export const explainers: Explainer[] = explainerFile.explainers
