import { describe, expect, test } from 'bun:test';
import { getRecipe } from '../../src/core/ai/recipes/index.ts';
import { resolveSchemaEmbeddingDim } from '../../src/core/embedding-dim-check.ts';

describe('Ollama BAAI/bge-m3 recipe support', () => {
  test('the Ollama embedding allowlist contains the historical namespaced alias', () => {
    const recipe = getRecipe('ollama');
    expect(recipe).toBeDefined();
    expect(recipe!.touchpoints.embedding?.models).toContain('BAAI/bge-m3');
  });

  test('the namespaced alias accepts its native 1024-dimensional contract', () => {
    const result = resolveSchemaEmbeddingDim({
      embedding_model: 'ollama:BAAI/bge-m3',
      embedding_dimensions: 1024,
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.dim).toBe(1024);
  });
});
