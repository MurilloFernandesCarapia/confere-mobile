import Botao from "@/components/ui/Botao";

type Props = {
  onSignOut: () => void;
};

const Logout = ({ onSignOut }: Props) => {
  return (
    <Botao
      titulo="Sair da conta"
      icone="log-out-outline"
      variante="perigo"
      onPress={onSignOut}
    />
  );
};

export default Logout;
