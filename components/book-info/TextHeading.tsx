function TextHeading({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      <div
        className={`block text-2xl md:text-3xl lg:text-4xl tracking-widest font-semibold font-qwitcher mb-4 text-muted-foreground my-auto mt-6 ${className}`}
      >
        {text}:
      </div>
    </>
  )
}
export default TextHeading
