import styled from "styled-components";

export const Item = styled.li`
  display: grid; grid-template-columns: 18px 1fr auto; align-items: center;
  gap: 7px; min-height: 46px; padding: 7px 10px;
  border-bottom: 1px solid #edf0f6; color: #28344a; font-size: 13px; line-height: 1.4;
  @media (max-width: 340px) { grid-template-columns: 18px minmax(0, 1fr); }
`;

export const Botao = styled.button`
  min-width: 68px; height: 30px; padding: 0 10px;
  border: 1px solid #e4e7ef; border-radius: 8px; background: #fff;
  color: #697386; cursor: pointer; font-size: 11px;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  &:hover { border-color: #ff8a8a; background: #fff5f5; color: #e05b5b; }
  @media (max-width: 340px) { grid-column: 2; justify-self: start; }
`;

export const Checkbox = styled.input`
  margin: 0; accent-color: #6875f5; cursor: pointer;
`;

export const Texto = styled.span`
  ${({ $concluida }) => $concluida && `
    color: #9aa3b2;
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
    text-decoration-color: #9aa3b2;
  `}
`;
