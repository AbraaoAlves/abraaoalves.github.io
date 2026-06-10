/**
 * Renders a JSON-LD structured-data block. Server component, static-export
 * safe. Pass a plain object built by helpers in @/lib/structured-data.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
