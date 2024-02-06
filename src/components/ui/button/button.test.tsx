import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("button component tests", () => {
  // Снимок при наличии текста
  it("renders button with text", () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Снимок компонента без текста
  it("renders button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Снимок disabled кнопки
  it("renders disabled button correctly", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Снимок loading кнопки
  it("renders loading button correctly", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // Тест взаимодействия
  it("calls the onClick callback when button is clicked", () => {
    // Подготовка: Устанавливаем кнопку с callback
    const callback = jest.fn();
    render(<Button onClick={callback} />);
    // Действие: Симулируем клик по кнопке
    const button = screen.getByRole("button");
    fireEvent.click(button);
    // Проверка: Убеждаемся, что обратный вызов был вызван
    expect(callback).toHaveBeenCalled();
  });
});
