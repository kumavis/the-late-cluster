# A Whisper that stays loaded, for the fitting tool (fit.ts): one model per process, one job per
# line on stdin, one answer per line on stdout. A job is {"id": ..., "file": "<wav>", "max": <tokens>};
# the answer is {"id": ..., "text": "..."}. It decodes as the `whisper` command does (beam 5,
# best of 5, the same thresholds) at temperature 0 only, so the same audio always gives the same
# text, and `max` caps the tokens so a clip it cannot parse ("meowowow") does not run on.
# Run with the Python that has openai-whisper installed: argv[1] is the model name.
import json
import sys

import whisper

model = whisper.load_model(sys.argv[1])
print(json.dumps({"ready": True}), flush=True)
for raw in sys.stdin:
    raw = raw.strip()
    if not raw:
        continue
    job = json.loads(raw)
    try:
        r = model.transcribe(
            job["file"],
            language="en",
            temperature=0.0,
            condition_on_previous_text=False,
            fp16=False,
            verbose=None,
            beam_size=5,
            best_of=5,
            sample_len=int(job.get("max", 224)),
        )
        text = " ".join(r["text"].split())
    except Exception as e:  # one bad file must not stop the others
        text = ""
        print(json.dumps({"id": job.get("id"), "text": "", "error": str(e)}), flush=True)
        continue
    print(json.dumps({"id": job.get("id"), "text": text}), flush=True)
