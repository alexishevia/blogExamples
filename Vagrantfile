Vagrant.configure("2") do |config|
  # box to build from
  config.vm.box = "Puppetlabs Ubuntu 12.04.2 x86_64, VBox 4.2.10, No Puppet or Chef"

  # the url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system
  config.vm.box_url = "http://puppet-vagrant-boxes.puppetlabs.com/ubuntu-server-12042-x64-vbox4210-nocm.box"

  # forward ports
  config.vm.network :forwarded_port, host: 3000, guest: 3000

  config.vm.provider :virtualbox do |vb|
    # This allows symlinks to be created within the /vagrant root directory,
    # which is something librarian-puppet needs to be able to do. This might
    # be enabled by default depending on what version of VirtualBox is used.
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
  end

  # install puppet and librarian-puppet
  config.vm.provision :shell, :path => "shell/install-puppet.sh"
  config.vm.provision :shell, :path => "shell/install-librarian-puppet.sh"

  # provision with Puppet stand alone
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "default.pp"
    puppet.options = "--hiera_config /etc/hiera.yaml"
  end

end
