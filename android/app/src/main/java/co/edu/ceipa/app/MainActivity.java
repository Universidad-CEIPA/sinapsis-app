package sinapsis.ceipa.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
//import com.getcapacitor.Filesystem;
//import com.github.sbannigan.capacitor.VideoRecorder;
//import com.jeep.plugin.capacitor.CapacitorVideoPlayer;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    /* CAPACITOR 2// Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
        add(VideoRecorder.class);
        add(CapacitorVideoPlayer.class);
    }});*/
  }
}
