export default function escapeHtml(str: string): string {
  if (!str) {
    return '';
  }

  return typeof window !== 'undefined' ?
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;') :
    String(str)
      .replace(/&/g, '\u0026')
      .replace(/</g, '\u003c')
      .replace(/>/g, '\u003e')
      .replace(/"/g, '\u0022')
      .replace(/'/g, '\u0027');
}
