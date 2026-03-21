import { PageLoader } from "@/components/Olympicloader"

const Loading = () => {
  return (
    <PageLoader
      variant="torch"
      text="Chargement en cours..."
      subtext="Paris 2024"
    />
  )
}

export default Loading
