import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status={"camasutra"} />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("camasutra");
  });

  test("after creation <span> with status should be displayed", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("after creation <input> with status should be displayed", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });

  test("after creation <span> should contains correct status", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("it-kamasutra");
  });

  test("input should be displayed in Editmode instead span", () => {
    const component = create(<ProfileStatus status="it-kamasutra" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("it-kamasutra");
  });

  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="it-kamasutra" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deActivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
