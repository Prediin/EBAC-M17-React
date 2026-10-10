import styled from "styled-components";

export const Form = styled.form`
  display: flex; gap: 8px; width: 100%; margin-bottom: 6px;
  @media (max-width: 420px) { gap: 6px; }
  @media (max-width: 340px) { flex-direction: column; }
`;

export const Input = styled.input`
  min-width: 0; flex: 1; height: 40px; padding: 0 13px;
  border: 1px solid #dbe3ef; border-radius: 10px; background: #fff;
  color: #172033; font-size: 13px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus { outline: none; border-color: #6875f5; box-shadow: 0 0 0 4px rgba(104, 117, 245, 0.14); }
`;

export const Button = styled.button`
  height: 40px; padding: 0 16px; border: 0; border-radius: 10px;
  background: #6875f5; color: #fff; cursor: pointer; font-size: 12px; font-weight: 700;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  &:hover { background: #5361e8; box-shadow: 0 6px 14px rgba(104, 117, 245, 0.25); transform: translateY(-1px); }
  @media (max-width: 340px) { width: 100%; }
`;

export const List = styled.ul`
  margin: 16px 0 0; padding: 0; list-style: none;
`;
