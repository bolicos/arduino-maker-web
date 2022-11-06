import { MirageServer } from "#/controllers/mirage/server";
import { setup } from "#/setupTests";
import { Server } from "miragejs";
import Header from ".";

const init = (title: string) => {
  return setup(<Header title={title} />)
}

describe("Header :", () => {
  let server: Server;

  beforeEach(() => {
    server = MirageServer();
  });

  afterEach(() => {
    server.shutdown();
  });

  it("Component is alive", () => {
    const { getByTestId } = setup("Example");
    const element = getByTestId("navbar");

    expect(element).toBeInTheDocument();
  });

  it("Verify that the elements are present on screen", () => {
    const { getByTestId } = init("Example");
    const navBrand = getByTestId("navBrand");
    const ifrsImage = getByTestId("ifrsImage");
    const tuftsImage = getByTestId("tuftsImage");
    const bottomlessEngineImage = getByTestId("bottomlessEngineImage");

    expect(navBrand).toBeInTheDocument();
    expect(ifrsImage).toBeInTheDocument();
    expect(tuftsImage).toBeInTheDocument();
    expect(bottomlessEngineImage).toBeInTheDocument();
  });

  it("Should make the replace of the title", () => {
    const { getByTestId } = init("Example");
    const title = getByTestId("title");

    expect(title).toBeInTheDocument();
    expect(title).toContainHTML("Example");
  });
});
