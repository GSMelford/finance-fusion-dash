import TransactionPanel from "@/components/TransactionPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#2A2438] p-6 md:p-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6 text-white hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </Button>
      <div className="max-w-xl mx-auto">
        <TransactionPanel />
      </div>
    </div>
  );
};

export default AddTransaction;