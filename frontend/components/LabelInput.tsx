import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LabeledInputProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

const LabeledInput = ({
  id,
  label,
  value,
  onChange,
  required = false,
  type = 'text',
  placeholder = '',
}: LabeledInputProps): React.JSX.Element => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // required={required}
      />
    </div>
  );
};

export default LabeledInput;
