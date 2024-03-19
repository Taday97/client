import '../App.css';
import ProductsTable from './Tables/ProductsTable';
import { SelectionProvider } from './SelectionContext';
import DoneModal from './Modals/DoneModal';
import ModalAddSubproduct from './Modals/ModalAdd';
const Add = () => {

    return (
        <div className="container mt-2">
            <SelectionProvider>
                <ProductsTable />
                <DoneModal/>
                <ModalAddSubproduct/>
            </SelectionProvider>
        </div>
    );
};
export default Add;