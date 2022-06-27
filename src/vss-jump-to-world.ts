import vss, { actEventCodes, FileOpenFlags, RoadRuntimeObjId } from "./vss";

export function init() {
    const assets = vss.getScriptsFolder() + "/assets/";
    vss.addQuantListener("runtime_object", (payload) => {
        if (payload.runtimeObjectId === RoadRuntimeObjId.RTO_GAME_QUANT_ID) {
            vss.sendEvent(actEventCodes.EV_TELEPORT, 8);
        }
    });

    vss.addQuantListener("file_open", (payload) => {
        const { file, flags } = payload;
        if ((flags & FileOpenFlags.XS_IN) === 0) {
            return;
        }

        if (vss.isFileExists(assets + file)) {
            return {
                file: assets + file,
            };
        }
    });
}
