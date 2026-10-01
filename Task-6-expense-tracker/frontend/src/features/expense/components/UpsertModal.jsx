import ExpenseForm from "./ExpenseForm";

const UpsertModal = ({mode, expenseToUpdate, toggleModal}) => {
    
  return (
    <div onClick={toggleModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl ">
        <ExpenseForm
          mode={mode}
          expenseToUpdate={expenseToUpdate}
          onSuccess={toggleModal}
        />
      </div>
    </div>
  );
};

export default UpsertModal;
