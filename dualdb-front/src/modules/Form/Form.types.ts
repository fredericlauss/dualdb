import { FormEvent } from "react";

export type FormHandler<Value> = (parameters: {
    name: string;
    value: Value;
    event: FormEvent;
}) => void