export default function autofix(content: string) {
  return String(content)
    .replace(/nus\s*whispers?\b/gi, 'NUSWhispers')
    .replace(/nus\s*mods?\b/gi, 'NUSMods');
}
